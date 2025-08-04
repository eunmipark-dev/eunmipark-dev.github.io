const useClipboard = () => {
  const copyToClipboard = async (textToCopy: string) => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      } catch {
        return false;
      }
    } else {
      try {
        const textField = document.createElement('textarea');
        textField.value = textToCopy;
        document.body.appendChild(textField);
        textField.select();
        const successful = document.execCommand('copy');
        textField.remove();
        return successful;
      } catch {
        return false;
      }
    }
  };

  return { copyToClipboard };
};

export default useClipboard;
