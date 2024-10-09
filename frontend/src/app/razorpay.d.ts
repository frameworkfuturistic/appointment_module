// razorpay.d.ts
declare module "razorpay" {
    interface RazorpayOptions {
      key?: string;
      amount?: number;
      currency?: string;
      name?: string;
      description?: string;
      order_id?: string;
      handler?: (response: any) => void;
      prefill?: {
        name?: string;
        email?: string;
        contact?: string;
      };
      theme?: {
        color?: string;
      };
    }
  
    interface Razorpay {
      new (options: RazorpayOptions): {
        open: () => void;
        close: () => void;
      };
    }
  
    interface Window {
      Razorpay: Razorpay;
    }
  }
  