import "reflect-metadata";
import {isArray} from "@nestjs/swagger/dist/plugin/utils/ast-utils";

/**
 * 스웨거 적용된 DTO의 인스턴스를 만든 후 default 값을 적용한다.
 *
 * @param type DTO 클래스
 * @param containRequiredFalse required = false 필드 적용 여부
 * */
export function createSwaggerDefaultDto<T>(type: { new (): T }, containRequiredFalse = true) {
    const instance = new type();

    const propertyNames = Object.getOwnPropertyNames(instance) as Array<keyof T>;

    for (const propertyName of propertyNames) {
        const decoratorValues = Reflect.getMetadata('swagger/apiModelProperties', type.prototype, propertyName as string);

        if (!decoratorValues) {
            continue;
        }

        const fieldType = Reflect.getMetadata('design:type', type.prototype, propertyName as string);
        const defaultValue = decoratorValues['default'];
        const isRequired = decoratorValues['required'];
        const isArray = decoratorValues['isArray'];
        if (!containRequiredFalse && !isRequired) {
            continue;
        }

        if (typeof defaultValue === 'function') {
            if (isArray || (fieldType === Array && !Array.isArray(defaultValue))) {
                (instance[propertyName] as any[]) = [createSwaggerDefaultDto(defaultValue, containRequiredFalse)];
                continue;
            }
            instance[propertyName] = createSwaggerDefaultDto(defaultValue, containRequiredFalse);
            continue;
        }

        if (Array.isArray(defaultValue) && typeof defaultValue[0] === 'function') {
            (instance[propertyName] as any[]) = defaultValue.map((d) => createSwaggerDefaultDto(d, containRequiredFalse));
            continue;
        }

        instance[propertyName] = defaultValue;
    }

    return instance;
}

export function updateSwaggerDto<T>(dto: T, value: Partial<T>) {
    const fieldNames = Object.keys(value) as Array<keyof T>;

    for (const fieldName of fieldNames) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        dto[fieldName] = value[fieldName];
    }
}
