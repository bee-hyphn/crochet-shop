export default function EsewaButton({ product, onSuccess }) {
  const handlePayment = () => {
    const esewaData = {
      amount: product.price.toString(),
      transaction_uuid: `TXN-${Date.now()}`,
      product_code: product.id,
      product_service_charge: "0",
      product_delivery_charge: "0",
      success_url: "https://crochet-shop-b.vercel.app/success",
      failure_url: "https://crochet-shop-b.vercel.app/failure",
      signed_field_names: "total_amount,transaction_uuid,product_code"
    };
    
    // eSewa form submission would go here
    console.log("Processing eSewa payment:", esewaData);
    if (onSuccess) onSuccess();
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
    >
      🛒 Buy via eSewa
    </button>
  );
}
