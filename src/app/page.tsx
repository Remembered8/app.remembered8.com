import type { Metadata } from 'next';

import RememberedApp from '@/components/RememberedApp';

export const metadata: Metadata = {
  title: 'Remembered — Her insan hatırlanmayı hak eder',
  description:
    'Kuşaklar boyu süren, saygın ve kalıcı bir insan anısı arşivi. Sesleri, mektupları, görüntüleri ve düşünceleri korur.',
};

export default function Home() {
  return <RememberedApp />;
}
