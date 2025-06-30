import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json',
  },
});

const config: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'sharedresourcesstack-fitpassbucket512ab13d-lz12ovpb53jz.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'staging.nyamie.com',
      },
    ],
  },
};

export default withNextIntl(config);
