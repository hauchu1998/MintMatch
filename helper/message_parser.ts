export const encodeMessage = (command: string, payload: object) => {
    const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64');
    return `::${command}(${base64Payload})`;
  };
  
  export const decodeMessage = (msg: string) => {
    const regex = /::(\w+)\((.+)\)/;
    const found = msg.match(regex);
    if (found) {
      try {
        const command = found[1];
        const base64Payload = found[2];
        const payload = JSON.parse(Buffer.from(base64Payload, 'base64').toString());
        return {
          command,
          payload,
        };
      } catch (e) {
        console.error('Error decoding message:', e);
      }
    }
    return null;
  };
  