// src/app/builder/components/BuilderClient.tsx
'use client';

import React from 'react';
import InteractiveFlowchart from './InteractiveFlowchart';
import MobileInteractiveFlowchart from './MobileInteractiveFlowchart';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function BuilderClient() {
  const isVertical = useMediaQuery('(orientation: portrait)');
  return isVertical ? <MobileInteractiveFlowchart /> : <InteractiveFlowchart />;
}
