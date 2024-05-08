import "reflect-metadata";
/**
 * 스웨거 적용된 DTO의 인스턴스를 만든 후 default 값을 적용한다.
 *
 * @param type DTO 클래스
 * @param containRequiredFalse required = false 필드 적용 여부
 * */
export default function createSwaggerDefaultDto<T>(type: {
    new (): T;
}, containRequiredFalse?: boolean): T;
export declare function updateSwaggerDto<T>(dto: T, value: Partial<T>): void;
