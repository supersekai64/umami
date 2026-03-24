import type { Metadata } from 'next';
import { WebsitesSettingsPage } from './WebsitesSettingsPage';

export default async function () {
  return <WebsitesSettingsPage />;
}

export const metadata: Metadata = {
  title: 'Websites',
};
