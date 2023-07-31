
import React from 'react';
import { Tag } from 'primereact/tag';

export default function CustomTag({children}) {
    return (
        <Tag className='customTag'>{children}</Tag>
    );
}
