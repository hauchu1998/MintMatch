import { useContext } from 'react';

import { XmtpContext, XmtpContextType } from '../contexts/XmtpContexts';

const useXmtp = (): XmtpContextType => {
  const context = useContext(XmtpContext);
  if (context === undefined) {
    throw new Error('useXmtp must be used within an XmtpProvider');
  }
  return context;
};

export default useXmtp;