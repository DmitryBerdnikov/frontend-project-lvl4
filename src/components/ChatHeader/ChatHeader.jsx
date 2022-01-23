import React from 'react';
import { useTranslation } from 'react-i18next';

const ChatHeader = ({ channel, messages }) => {
  if (!channel) {
    return null;
  }

  const { t } = useTranslation();

  return (
    <>
      <h1 className="h6 mb-0">{`# ${channel.name}`}</h1>
      <div className="text-muted">{t('messageCount', { count: messages.length })}</div>
    </>
  );
};

export default ChatHeader;
