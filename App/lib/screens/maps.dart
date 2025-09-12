import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter_google_street_view/flutter_google_street_view.dart';
import 'package:permission_handler/permission_handler.dart';

class StreetViewExample extends StatefulWidget {
  @override
  _StreetViewExampleState createState() => _StreetViewExampleState();
}

class _StreetViewExampleState extends State<StreetViewExample> {
  GoogleMapController? mapController;
  bool _isMapReady = false;
  String? _errorMessage;
  bool _isLoading = true;
  bool _isDisposed = false;
  bool _locationPermissionGranted = false;
  Timer? _cleanupTimer;

  @override
  void initState() {
    super.initState();
    _requestLocationPermission();
    _startCleanupTimer();
  }

  @override
  void dispose() {
    _isDisposed = true;
    _cleanupTimer?.cancel();
    mapController?.dispose();
    super.dispose();
  }

  void _startCleanupTimer() {
    // Periodic cleanup to prevent buffer accumulation
    _cleanupTimer = Timer.periodic(const Duration(seconds: 30), (timer) {
      if (_isDisposed) {
        timer.cancel();
        return;
      }
      _performCleanup();
    });
  }

  void _performCleanup() {
    // Force garbage collection to free up graphics buffers
    if (mounted && !_isDisposed) {
      // This helps prevent buffer accumulation
      SystemChannels.platform.invokeMethod('System.gc');
    }
  }

  Future<void> _requestLocationPermission() async {
    try {
      // Request location permission
      var status = await Permission.location.request();
      
      if (mounted) {
        setState(() {
          _locationPermissionGranted = status.isGranted;
          if (!_locationPermissionGranted) {
            _errorMessage = 'Location permission is required for Google Maps to work properly. Please grant permission in settings.';
          }
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = 'Error requesting location permission: $e';
        });
      }
    }
  }

  void _onMapCreated(GoogleMapController controller) {
    if (_isDisposed) return;
    
    try {
      mapController = controller;
      if (mounted) {
        setState(() {
          _isMapReady = true;
          _isLoading = false;
          _errorMessage = null;
        });
        
        // Safely animate camera with error handling
        _animateToLocation();
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _errorMessage = 'Error initializing map: $e';
          _isLoading = false;
        });
      }
    }
  }

  void _animateToLocation() {
    if (mapController != null && _isMapReady) {
      try {
        mapController!.animateCamera(
          CameraUpdate.newCameraPosition(
            const CameraPosition(
              target: LatLng(27.7172, 88.4543), // Sikkim coordinates
              zoom: 15.0,
              bearing: 0.0,
              tilt: 0.0,
            ),
          ),
        );
      } catch (e) {
        setState(() {
          _errorMessage = 'Error animating camera: $e';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sikkim Tourism Map'),
        backgroundColor: Colors.green[700],
        foregroundColor: Colors.white,
      ),
      body: Stack(
        children: [
          GoogleMap(
            onMapCreated: _onMapCreated,
            initialCameraPosition: const CameraPosition(
              target: LatLng(27.7172, 88.4543), // Sikkim coordinates
              zoom: 12.0,
            ),
            markers: {
              const Marker(
                markerId: MarkerId('sikkim'),
                position: LatLng(27.7172, 88.4543),
                infoWindow: InfoWindow(
                  title: 'Sikkim',
                  snippet: 'Beautiful Himalayan State',
                ),
              ),
            },
            // Aggressive buffer overflow prevention settings
            myLocationEnabled: _locationPermissionGranted,
            myLocationButtonEnabled: _locationPermissionGranted,
            zoomControlsEnabled: true,
            mapType: MapType.normal,
            // Disable all heavy rendering features to prevent buffer overflow
            compassEnabled: false,
            mapToolbarEnabled: false,
            buildingsEnabled: false,
            trafficEnabled: false,
            // Disable 3D features that consume more buffers
            tiltGesturesEnabled: false,
            rotateGesturesEnabled: false, // Disable rotation to reduce buffer usage
            scrollGesturesEnabled: true,
            zoomGesturesEnabled: true,
            // Additional buffer optimization settings
            liteModeEnabled: false, // Keep full mode but with reduced features
            indoorViewEnabled: false, // Disable indoor maps
            padding: const EdgeInsets.all(0), // No padding to reduce rendering area
          ),
          if (_errorMessage != null)
            Positioned(
              top: 16,
              left: 16,
              right: 16,
              child: Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: Colors.red[100],
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: Colors.red[300]!),
                ),
                child: Row(
                  children: [
                    Icon(Icons.error, color: Colors.red[700]),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _errorMessage!,
                        style: TextStyle(color: Colors.red[700]),
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.close),
                      onPressed: () {
                        setState(() {
                          _errorMessage = null;
                        });
                      },
                    ),
                    if (_errorMessage != null && _errorMessage!.contains('permission'))
                      IconButton(
                        icon: const Icon(Icons.settings),
                        onPressed: () {
                          openAppSettings();
                        },
                      ),
                  ],
                ),
              ),
            ),
          if (_isLoading)
            Container(
              color: Colors.white,
              child: const Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(),
                    SizedBox(height: 16),
                    Text(
                      'Loading Google Maps...',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    SizedBox(height: 8),
                    Text(
                      'Please ensure you have internet connection',
                      style: TextStyle(
                        fontSize: 12,
                        color: Colors.grey,
                      ),
                    ),
                  ],
                ),
              ),
            ),
        ],
      ),
      floatingActionButton: !_locationPermissionGranted
          ? FloatingActionButton(
              onPressed: _requestLocationPermission,
              backgroundColor: Colors.green[700],
              child: const Icon(Icons.location_on, color: Colors.white),
              tooltip: 'Request Location Permission',
            )
          : null,
    );
  }
}