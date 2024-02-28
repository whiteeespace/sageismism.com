import styles from "./PoliciesPage.module.scss";

const TermsPage = () => (
  <div className={styles["container"]}>
    <div className={styles["info-column"]}>
      <h1 className={styles["title"]}>sageism ©</h1>
      <div className={styles["social-info"]}>
        <div className={styles["social-group"]}>
          <p className={styles["label"]}>instagram</p>
          <p className={styles["text"]}>@sageismism</p>
        </div>
        <div className={styles["social-group"]}>
          <p className={styles["label"]}>email</p>
          <p className={styles["text"]}>info@sageismism.com</p>
        </div>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>shipping</p>
        <p className={styles["text"]}>
          <p>
            All orders are shipped within 2-3 business days. Orders shipped outside of Canada may possibly
            incur duties and taxes.
          </p>
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>payments</p>
        <p className={styles["text"]}>
          <p>
            All listed prices are in Canadian Dollars. Currently accepted payments are Paypal, American
            Express, Visa & Mastercard.
          </p>
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>returns & exchanges</p>
        <p className={styles["text"]}>
          <p>
            All returns must be submitted within 14 business days of receiving your item(s). To be eligible
            for return, all items must be returned in their original packaging, clean, unworn and in sellable
            condition. To initiate a return, please notify us via email by attaching your order number.
          </p>
          <p>For international customers, you may communicate with our teams for further details.</p>
          <p>
            To file a return, please include your order number along with relevant pictures of the defective
            item(s) and one of our team members will authorize your return. A full refund will be issued upon
            reception of the returned order.
          </p>
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>policies</p>
        <p className={styles["text"]}>
          <p>Sageism © reserves the right to cancel an order at any time.</p>
          <p>
            Cancellation reasons may occur but are not limited to: lack of stock for order fulfilment, fraud
            suspicion, or any discrepancies on an item's description or price.
          </p>
          <p>We will notify you if your order cannot be fulfilled and a full refund will be issued.</p>
        </p>
      </div>
    </div>
  </div>
);

export default TermsPage;
