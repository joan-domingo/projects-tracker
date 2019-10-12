import React, { FC } from 'react';
import i18n from '../i18n/i18n';

const LoadingPage: FC = () => {
  return (
    <div>
      <p>{i18n.t('loadingPage.label')}</p>
    </div>
  );
};

export default LoadingPage;
