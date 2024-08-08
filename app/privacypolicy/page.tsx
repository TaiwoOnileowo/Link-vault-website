import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-black-100 text-white flex flex-col items-center p-16">
      <h1 className="text-3xl my-4 font-bold">
        Privacy Policy for Link Vault Chrome Extension
      </h1>
      <p>Last updated: August 8, 2024</p>
      <div className="mt-4 flex flex-col gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Introduction</h1>
          <p>
            Welcome to Link Vault! This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you use our
            Chrome extension. Please read this policy carefully. If you do not
            agree with the terms of this privacy policy, please do not use the
            extension.
          </p>
        </div>
        <div>
          <h1 className="text-2xl font-semibold ">Information We Collect</h1>
          <p>
            We may collect information about you in a variety of ways. The
            information we may collect via the extension includes:
          </p>
          <ul className="list-decimal my-4">
            <li>
              <strong>Personal Data: </strong>
              <span>
                When you create an account or log in, we collect personal
                information that can be used to identify you, such as your email
                address.
              </span>
            </li>
            {/* <li>
              <strong>Links and Folders Data </strong>
              <span>
                Our extension allows you to save, edit, delete, pin, and manage
                links and folders. This data is stored to provide you with the
                necessary functionality of the extension.
              </span>
            </li> */}
            {/* <li>
              <strong>Browser Information</strong>
              <span>
                We collect information about the browser and device you use to
                access the extension, including IP address, browser type, and
                version.
              </span>
            </li> */}
            <li>
              <strong>Usage Data:</strong>
              <span>
                We may collect information on how the extension is accessed and
                used. This data helps us understand how the extension is being
                used and to improve it.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-semibold my-4">
            How We Use Your Information
          </h1>
          <p className="my-4">
            We use the information we collect in the following ways:
          </p>
          <ul className="list-decimal">
            <li>To provide, operate, and maintain the Link Vault extension</li>
            <li>To improve, personalize, and expand our extension</li>
            <li>To understand and analyze how you use our extension</li>
            <li>To develop new features, services, and products</li>
            <li>
              To communicate with you, either directly or through one of our
              partners, including for customer service, updates, and other
              information relating to the extension
            </li>
            <li>To process your transactions and manage your orders</li>
            <li>
              To send you notifications about your saved links and folders
            </li>
            <li>
              To prevent fraudulent transactions, monitor against theft, and
              protect against criminal activity
            </li>
            <li>
              Ads: To display ads for free users. We do not share your personal
              information with advertisers
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-semibold my-4">
            Sharing Your Information
          </h1>
          <p className="my-4">
            We do not share your personal information with third parties, except
            in the following situations:
          </p>
          <ul className="list-decimal">
            <li>With your consent</li>
            <li>
              For external processing (e.g., with service providers who perform
              functions on our behalf, like hosting services)
            </li>
          </ul>
        </div>
        <div>
          <h1 className="text-2xl font-semibold my-4"> Data Security</h1>
          <p>
            We use administrative, technical, and physical security measures to
            help protect your personal information. While we have taken
            reasonable steps to secure the personal information you provide to
            us, please be aware that despite our efforts, no security measures
            are perfect or impenetrable, and no method of data transmission can
            be guaranteed against any interception or other type of misuse.
          </p>
        </div>
        {/* <div>
          <h1>Opt-Out</h1>
          <p>Ads: You can opt-out of ads by upgrading to a premium account.</p>
        </div> */}
        <div>
          <h1 className="text-2xl font-semibold my-4">
            Changes to This Privacy Policy
          </h1>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at: Email: taiwoonileowo17@gmail.com Address: Hope Estate, Okota,
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
