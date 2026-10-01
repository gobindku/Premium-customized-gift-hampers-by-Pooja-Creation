import SanityStudio from "../../../components/SanityStudio";
import { sanityConfigured } from "../../../sanity/lib/client";

export const metadata = { title: "Catalog editor | Pooja Creation" };

export default function StudioPage() {
  if (!sanityConfigured) {
    return (
      <main className="studio-setup">
        <h1>Connect your Sanity project</h1>
        <p>Add your Sanity project ID to <code>.env.local</code>, then restart the development server.</p>
      </main>
    );
  }

  return <SanityStudio />;
}