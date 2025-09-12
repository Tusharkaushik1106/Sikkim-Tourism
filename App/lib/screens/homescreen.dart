import 'package:flutter/material.dart';
import 'dart:ui';
import 'package:flutter/services.dart';
import 'package:sikkim_app/services/support_widget.dart';
import 'package:firebase_auth/firebase_auth.dart';

class Home extends StatefulWidget{
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();

}

class _HomeState extends State<Home>{
  bool gangtok=false, rumtek=false, yuksom=false, kabi=false;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.black,
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarIconBrightness: Brightness.light,
        ),

      ),
      body: Container(
        margin: EdgeInsets.only(top:50.0, left: 20.0,right: 20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text("Hello, World",
                style: AppWidget.headLineTextStyle(35.0),),
                Text("Welcome to Monastery360",
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    color: Colors.white,
                    fontSize: 16.0,
                  ),),
              ],
            ),ClipRRect(
              borderRadius: BorderRadius.circular(60),
              child: (FirebaseAuth.instance.currentUser?.photoURL != null)
                  ? Image.network(
                      FirebaseAuth.instance.currentUser!.photoURL!,
                      height: 40,
                      width: 40,
                      fit: BoxFit.cover,
                    )
                  : Image.asset(
                      "assets/images/home_monasery1.jpg",
                      height: 40,
                      width: 40,
                      fit: BoxFit.cover,
                    ),)
          ],
        ),
          SizedBox(height: 30.0,),
          Row(
            children: [
              Expanded(child:
              Container(width: MediaQuery.of(context).size.width,
                decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(60) ),
                child: Center(
                  child: TextField(
                  textAlign: TextAlign.center,
                  decoration: InputDecoration(border: InputBorder.none, hintText: "Search Monastery..", hintStyle: TextStyle(color: Colors.grey, ),),
                  style: TextStyle(color: Colors.white),),
                ),
              ),
              ),
              SizedBox(width: 10.0,),
              Container(
                width: 46.0,
                height: 46.0,
                padding: EdgeInsets.all(3.0),
                decoration: BoxDecoration(color: Colors.white12, borderRadius: BorderRadius.circular(60),shape: BoxShape.rectangle ),
                child: Center(
                  child: Image.asset("assets/images/Slider.png",height: 28,width: 28,),
                ),
              ),
            ],
          ),
          SizedBox(height: 30.0,),
          Text("Plan Your Trip To Sikkim", style: AppWidget.headLineTextStyle(20.0),),
            SizedBox(height: 20.0,),
            Container(
              height: 50.0,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: [
                 gangtok? Container(
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10.0,),),
                    child: Center(
                      child: Text("Gangtok", style: TextStyle(
                        fontFamily: 'Poppins',
                        color: Colors.black,
                        fontSize: 18.0,
                      ),
                      ),
                    ),
                  ): GestureDetector(
                    onTap: (){
                      gangtok=true;
                      rumtek=false;
                      yuksom=false;
                      kabi=false;
                      setState(() {

                      });
                    },
                    child:Container(
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(10.0,),),
                    child: Center(
                      child: Text("Gangtok", style: TextStyle(
                        fontFamily: 'Poppins',
                        color: Colors.white,
                        fontSize: 18.0,
                      ),
                      ),
                    ),
                    ),
                 ),
                  SizedBox(width: 18.0,),
                 rumtek?  Container(
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10.0,),),
                    child: Center(
                      child: Text("Rumtek", style: TextStyle(
                        fontFamily: 'Poppins',
                        color: Colors.black,
                        fontSize: 18.0,
                      ),
                      ),
                    ),
                  ):
                 GestureDetector(
                   onTap: (){
                     gangtok=false;
                     rumtek=true;
                     yuksom=false;
                     kabi=false;
                     setState(() {

                     });
                   },
                   child:Container(
                     padding: EdgeInsets.only(left: 10.0, right: 10.0),
                     decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(10.0,),),
                     child: Center(
                       child: Text("Rumtek", style: TextStyle(
                         fontFamily: 'Poppins',
                         color: Colors.white,
                         fontSize: 18.0,
                       ),
                       ),
                     ),
                   ),
                 ),
                  SizedBox(width: 18.0,),
                  yuksom? Container(
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10.0,),),
                    child: Center(
                      child: Text("Yuksom", style: TextStyle(
                        fontFamily: 'Poppins',
                        color: Colors.black,
                        fontSize: 18.0,
                      ),
                      ),
                    ),
                  ):
                  GestureDetector(
                    onTap: (){
                      gangtok=false;
                      rumtek=false;
                      yuksom=true;
                      kabi=false;
                      setState(() {

                      });
                    },
                    child:Container(
                      padding: EdgeInsets.only(left: 10.0, right: 10.0),
                      decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(10.0,),),
                      child: Center(
                        child: Text("Yuksom", style: TextStyle(
                          fontFamily: 'Poppins',
                          color: Colors.white,
                          fontSize: 18.0,
                        ),
                        ),
                      ),
                    ),
                  ),
                  SizedBox(width: 18.0,),
                  kabi? Container(
                    padding: EdgeInsets.only(left: 10.0, right: 10.0),
                    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10.0,),),
                    child: Center(
                      child: Text("Kabi", style: TextStyle(
                        fontFamily: 'Poppins',
                        color: Colors.black,
                        fontSize: 18.0,
                      ),
                      ),
                    ),
                  ):
                  GestureDetector(
                    onTap: (){
                      gangtok=false;
                      rumtek=false;
                      yuksom=false;
                      kabi=true;
                      setState(() {

                      });
                    },
                    child:Container(
                      padding: EdgeInsets.only(left: 10.0, right: 10.0),
                      decoration: BoxDecoration(color: Colors.white10, borderRadius: BorderRadius.circular(10.0,),),
                      child: Center(
                        child: Text("Kabi", style: TextStyle(
                          fontFamily: 'Poppins',
                          color: Colors.white,
                          fontSize: 18.0,
                        ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 20.0,),
            Center(
              child: Container(
                child: ClipRRect(
                    borderRadius: BorderRadiusGeometry.circular(30.0),
                    child: Image.asset("assets/images/gangtok1.jpg", height: 450.0, width: 350.0, fit: BoxFit.cover,)),
              ),
            ),
         ],
        ),
      ),
    );
  }
}
