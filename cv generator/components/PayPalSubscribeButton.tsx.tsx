interface Props {
  plan: 'pro' | 'business';
  onError?: (error: any) => void;
}

export default function PayPalSubscribeButton({ plan, onError }: Props) {
  const handleSubscribe = async () => {
    try {
      const res = await fetch('/api/payments/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.approvalURL) {
        window.location.href = data.approvalURL;
      } else {
        throw new Error('No approval URL');
      }
    } catch (err) {
      onError?.(err);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      className="w-full bg-[#0070ba] hover:bg-[#003087] text-white font-bold py-2 rounded-lg"
    >
      Subscribe with PayPal
    </button>
  );
}