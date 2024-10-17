import styles from "./styles.module.scss";

const PoliciesPage = () => (
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
          <li>Please allow 5–10 business days for your order to arrive within Canada after purchase.</li>
          <li>For US and international customers, shipping may take 8–14 business days.</li>
          <li>All orders include a tracking number.</li>
          <li>We are not responsible for lost or stolen packages.</li>
          <li>Montreal customers can also choose the pickup option.</li>
          <li>We will contact you via email after purchase to arrange a pickup date and time.</li>
          <br />
          ** Pickup Location: 350 Louvain Ouest Suite 424E, Montréal, Québec H2N 2E8
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>payments</p>
        <p className={styles["text"]}>
          All listed prices are in Canadian Dollars. Currently accepted payments are Paypal, American Express,
          Visa & Mastercard.
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>returns & exchanges</p>
        <p className={styles["text"]}>
          We want you to love your piece!
          <br />
          To initiate a return or exchange, please email us at sagemontreal@gmail.com with your order ID and
          details of the item(s) involved.
        </p>
        <p className={styles["sub-label"]}>returns</p>
        <p className={styles["text"]}>
          <li>You have 14 days from the date of purchase to return your item.</li>
          <li>Items must be unworn and in original condition.</li>
          <li>
            We do not cover return shipping costs, and we recommend using a tracked shipping service for your
            return.
          </li>
          <li>Once we receive your return, please allow 7 business days for your refund to be processed.</li>
          <li>If the item is deemed unsellable, we will return it to you.</li>
        </p>
        <p className={styles["sub-label"]}>exchanges</p>
        <p className={styles["text"]}>
          <li>Exchanges include a free return shipping label for customers in Quebec and Ontario.</li>
          <li>Returned items must be in original condition.</li>
        </p>
        <p className={styles["sub-label"]}>studio drop-off (for Montreal customers)</p>
        <p className={styles["text"]}>
          <li>
            Montreal customers can drop off items at our studio for quicker processing of exchanges or
            refunds.
          </li>
          <li>
            Please email us to schedule a drop-off date and time, which we will confirm with you via email.
          </li>
        </p>
      </div>
      <div className={styles["group"]}>
        <p className={styles["label"]}>policies</p>
        <p className={styles["text"]}>
          <span>Sageism © reserves the right to cancel an order at any time. </span>
          <span>
            Cancellation reasons may occur but are not limited to: lack of stock for order fulfilment, fraud
            suspicion, or any discrepancies on an item&apos;s description or price.
          </span>
          <span>We will notify you if your order cannot be fulfilled and a full refund will be issued.</span>
        </p>
      </div>
    </div>
  </div>
);

export default PoliciesPage;
