import { LegalInformationPage, type InformationPageProps } from "@/components/legal-information-page";

export default function Page(props: InformationPageProps) {
  return <LegalInformationPage {...props} page="about" />;
}
