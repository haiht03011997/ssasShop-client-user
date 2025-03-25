import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import { Link } from 'react-router-dom';

export const items = [
  {
    label: 'Danh mục',
    key: 'category-horizontal',
    icon: <DownOutlined />,
    children: [
      {
        label: 'Giải trí',
        key: 'entertainment-horizontal',
        className: 'sub-menu-item',
        icon: <img loading="lazy" src="/content/images/entertainment.svg" alt="entertainment" />,
        children: [
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Spotify
              </Link>
            ),
            key: 'Spotify-horizontal',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/spotify.svg" alt="spotify" />,
          },
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Netflix
              </Link>
            ),
            key: 'netflix-horizontal',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/netflix.svg" alt="netflix" />,
          },
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Youtube
              </Link>
            ),
            key: 'youtube-horizontal',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/youtube.svg" alt="youtube" />,
          },
        ],
      },
      {
        label: 'Công việc',
        key: 'work-horizontal',
        className: 'sub-menu-item',
        icon: <img loading="lazy" src="/content/images/brief-case.svg" alt="brief-case" />,
        children: [
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Adobe Photoshop
              </Link>
            ),
            key: 'photoshop-horizontal',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/photoshop.svg" alt="photoshop" />,
          },
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Adobe Illustrator
              </Link>
            ),
            key: 'netflix-illustrator',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/illustrator.svg" alt="illustrator" />,
          },
        ],
      },
      {
        label: 'Lưu trữ',
        className: 'sub-menu-item',
        key: 'storage-horizontal',
        icon: <img loading="lazy" src="/content/images/storage.svg" alt="storage" />,
        children: [
          {
            label: (
              <Link className="m-0 text-decoration-none" to={'#'}>
                Tài khoản Google Drive
              </Link>
            ),
            key: 'google-drive-horizontal',
            className: 'd-flex',
            icon: <img loading="lazy" src="/content/images/google-drive.svg" alt="google-drive" />,
          },
        ],
      },
    ],
  },
];
