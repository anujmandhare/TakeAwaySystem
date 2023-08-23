
import React from 'react';
import { Tag } from 'primereact/tag';

export default function CustomTag({ children, tooltip }) {
    return (
        <Tag className='customTag' tooltip={tooltip}>{children}</Tag>
    );
}
