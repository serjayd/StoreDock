import StoresClientWrapper from "@/features/stores/components/StoresClientWrapper";
import StoresContainer from "@/features/stores/components/StoresContainer";

export default async function StoresPage() {
  return (
    <StoresClientWrapper>
      <StoresContainer />
    </StoresClientWrapper>
  );
}
