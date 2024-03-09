export abstract class NaverLandResponseDto<T> {
    isSuccess: boolean;
    abstract result?: T;
}
