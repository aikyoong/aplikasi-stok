import Layout from "@/components/Layout";
import { Link } from "@tanstack/react-router";

function ThxOrder() {
  return (
    <Layout>
      {/* min-h-screen */}
      <div className=" max-w-5xl mx-auto text-center">
        <div className="py-12">
          <h2 className="text-3xl font-semibold mb-12">
            Thank You for Your Order!
          </h2>
          <p className="text-md">
            Thank You for Your Order! We truly appreciate your trust in placing
            an order with us. To view your invoice and check the status of your
            order, please visit this{" "}
            <Link to="/login" className="text-blue-500">
              link
            </Link>
            . Thank you once again for your support. We look forward to serving
            you again in the future.
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default ThxOrder;
