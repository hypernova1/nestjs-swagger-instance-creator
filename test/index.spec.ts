import { createSwaggerDefaultDto, updateSwaggerDto } from '../src';
import {ApiProperty} from "@nestjs/swagger";

class Post {
    @ApiProperty({
        description: 'post title',
        default: 'hello',
        required: true,
    })
    title: string | undefined;

    @ApiProperty({
        description: 'post content',
        default: 'world',
        required: false,

    })
    content: string | undefined;
}

class User {
    @ApiProperty({
        description: 'name',
        default: 'melchor',
        required: true,
    })
    name: string | undefined;

    @ApiProperty({
        description: 'post list',
        type: Post,
        isArray: true,
        default: Post,
        required: false,
    })
    posts: Post[] | undefined;
}


describe('test', () => {
    it('create default instance', () => {
        const instance = createSwaggerDefaultDto(User);
        expect(instance.name).toBeDefined();
    });

    it('create default instance without required fields', () => {
        const instance = createSwaggerDefaultDto(User, false);
        expect(instance.posts).toBeUndefined();
    });

    it('create instance and get array property', () => {
        const instance = createSwaggerDefaultDto(User);
        expect(instance.posts).toBeDefined();
        expect(Array.isArray(instance.posts)).toBeTruthy();
    });

    it('create instance and update instance', () => {
        const instance = createSwaggerDefaultDto(User);
        const preName = instance.name;
        updateSwaggerDto(instance, {
            name: 'morgoth',
        });
        const updatedName = instance.name;

        expect(preName).not.toEqual(updatedName);
    });
});