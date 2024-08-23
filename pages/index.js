import { useState } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const sendMessage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sendSlackMessage', { method: 'POST' });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, error: 'Failed to send message' });
    }
    setIsLoading(false);
  };

  return (
    <div className='flex justify-center items-center flex flex-col my-80'>
      <h1>Send Slack Message</h1>
      <button onClick={sendMessage} disabled={isLoading} className="bg-slate-50 px-4 py-2 w-60 rounded-lg my-3 text-black">
        {isLoading ? 'Sending...' : 'Send Message'}
      </button>
      {result && (
        <p>
          {result.success ? 'Message sent successfully!' : 'Failed to send message'}
        </p>
      )}
    </div>
  );
}