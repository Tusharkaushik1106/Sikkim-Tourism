"use client";

import React, { useEffect, useRef } from 'react';

type SceneConfig = {
	image: string;
	title?: string;
	pitch?: number;
	yaw?: number;
	hfov?: number;
	minHfov?: number;
	maxHfov?: number;
	northOffset?: number;
};

type HotspotLink = {
	sceneId: string;
	yaw: number;
	pitch: number;
	text?: string;
};

type Props = {
	id: string;
	className?: string;
	style?: React.CSSProperties;
	// Initial scene to load
	defaultSceneId: string;
	// Scenes keyed by id
	scenes: Record<string, SceneConfig & { links?: HotspotLink[] }>;
};

export default function PannellumTour({ id, className = "", style, defaultSceneId, scenes }: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		// Load Pannellum CSS and JS from CDN if not already present
		const ensureAssets = async () => {
			const cssId = 'pannellum-css';
			const jsId = 'pannellum-js';

			if (!document.getElementById(cssId)) {
				const link = document.createElement('link');
				link.id = cssId;
				link.rel = 'stylesheet';
				link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
				document.head.appendChild(link);
			}

			const waitForGlobal = () => new Promise<void>((resolve, reject) => {
				const start = Date.now();
				const check = () => {
					if ((window as any).pannellum) return resolve();
					if (Date.now() - start > 8000) return reject(new Error('Pannellum not available'));
					setTimeout(check, 50);
				};
				check();
			});

			if (!document.getElementById(jsId)) {
				await new Promise<void>((resolve, reject) => {
					const script = document.createElement('script');
					script.id = jsId;
					script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
					script.async = true;
					script.onload = () => resolve();
					script.onerror = () => reject(new Error('Failed to load Pannellum'));
					document.body.appendChild(script);
				});
				await waitForGlobal();
			} else {
				// Script tag exists; wait until global is ready
				await waitForGlobal();
			}
		};

		const init = async () => {
			await ensureAssets();
			const pannellum = (window as any).pannellum;
			if (!pannellum || !containerRef.current) return;

			// Build scenes in Pannellum config format
			const pannellumScenes: any = {};
			Object.entries(scenes).forEach(([sceneId, cfg]) => {
				pannellumScenes[sceneId] = {
					type: 'equirectangular',
					panorama: cfg.image,
					title: cfg.title,
					pitch: cfg.pitch ?? 0,
					yaw: cfg.yaw ?? 0,
					hfov: cfg.hfov ?? 80,
					minHfov: cfg.minHfov ?? 60,
					maxHfov: cfg.maxHfov ?? 110,
					northOffset: cfg.northOffset ?? 0,
					autoLoad: true,
					hotSpots: (cfg.links || []).map(link => ({
						type: 'scene',
						text: link.text,
						pitch: link.pitch,
						yaw: link.yaw,
						sceneId: link.sceneId
					}))
				};
			});

			// Ensure the container has a height
			if (containerRef.current && !containerRef.current.style.height) {
				containerRef.current.style.height = (style?.height as any) || '500px';
			}

			pannellum.viewer(id, {
				author: 'Sikkim Tourism',
				default: {
					firstScene: defaultSceneId,
					sceneFadeDuration: 1000
				},
				sceneFadeDuration: 1000,
				showControls: true,
				showZoomCtrl: true,
				showFullscreenCtrl: true,
				keyboardZoom: true,
				mouseZoom: true,
				compass: true,
				scenes: pannellumScenes
			});
		};

		init();
		// No cleanup required; viewer attaches to container
	}, [id, defaultSceneId, scenes]);

	return (
		<div ref={containerRef} id={id} className={className} style={style} />
	);
}


