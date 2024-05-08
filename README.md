# NestJs Swagger Default Instance Creator
This is a library that reads information from Swagger decorators and creates instances.

## How to use

### create instance

~~~typescript
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

const instance = createSwaggerDefaultDto(User);

console.log(instance);
~~~
~~~
Post { title: 'hello', content: 'world' }
~~~

### update instance
~~~typescript
updateSwaggerDto(instance, { name: 'morgoth' });

const updatedName = instance.name;

console.log(updatedName);
~~~
~~~
morgoth
~~~