// src/app/builder/page.tsx

import type { Metadata } from 'next';
import InteractiveFlowchart from './components/InteractiveFlowchart';

export const metadata: Metadata = {
  title: 'Profile Builder',
};

export default function BuilderPage() {
  return <InteractiveFlowchart />;
}
