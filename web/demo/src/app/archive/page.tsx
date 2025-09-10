'use client'

import React from 'react';
import Header from '@/components/header';
import DigitalArchive from '@/components/digital-archive';

export default function ArchivePage() {
  return (
    <div>
      <Header />
      <div className="pt-20">
        <DigitalArchive />
      </div>
    </div>
  );
}