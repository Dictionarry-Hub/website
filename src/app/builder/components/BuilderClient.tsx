// src/app/builder/components/BuilderClient.tsx
'use client';

import React from 'react';
import InteractiveFlowchart from './InteractiveFlowchart';
import MobileInteractiveFlowchart from './MobileInteractiveFlowchart';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function BuilderClient() {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isNarrow = useMediaQuery('(max-width: 1024px)');
  const shouldUseMobile = isPortrait || isNarrow;

  return shouldUseMobile ? <MobileInteractiveFlowchart /> : <InteractiveFlowchart />;
}
