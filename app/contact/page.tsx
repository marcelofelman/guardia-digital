import { ContactForm } from "../components/contact/ContactForm";
import MainLayout from "../components/layout/MainLayout";

export default function ContactPage() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-8">
          Please fill out the form below to get in touch with us.
        </p>
        <ContactForm />
      </div>
    </MainLayout>
  );
}
