import { CamperListResponseDto } from "@/types/camper";

const BASE_URL = "https://campers-api.goit.study";

export async function fetchCampers(
  params?: Record<string, string>,
): Promise<CamperListResponseDto> {
  const url = new URL(`${BASE_URL}/campers`);
  const limitValue = params?.limit ? parseInt(params.limit, 10) : 4;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.append(key, value);
    });
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch campers");
  }
  const data: CamperListResponseDto = await res.json();
  return {
    ...data,
    campers: data.campers.slice(0, limitValue),
  };
}
