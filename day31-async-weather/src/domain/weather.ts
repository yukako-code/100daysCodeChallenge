export type Weather = {
    tempC: string;
    description: string;
    areaName: string;
};

// WTTR.INのレスポンス型（必要な部分のみ定義）
type WttrResponse = {
    current_condition?: Array<{
        temp_C?: string;
        weatherDesc?: Array<{ value?: string }>;
    }>;
    nearest_area?: Array<{
        areaName?: Array<{ value?: string }>;
    }>;
};

// APIレスポンス → UI用モデルへの正規化（不正値は安全にデフォルト化）
export function normalizeWttrResponse(json: unknown, fallbackCity: string): Weather {
    const data = json as WttrResponse;

    const current = data?.current_condition?.[0];
    const area = data?.nearest_area?.[0];

    return {
        tempC: current?.temp_C ?? "",
        description: current?.weatherDesc?.[0]?.value ?? "",
        areaName: area?.areaName?.[0]?.value ?? fallbackCity,
    };
}