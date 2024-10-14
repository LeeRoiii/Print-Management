// src/qrcode-react.d.ts
declare module 'qrcode.react' {
    import { Component } from 'react';

    export interface QRCodeProps {
        value: string;
        size?: number;
        bgColor?: string;
        fgColor?: string;
        level?: 'L' | 'M' | 'Q' | 'H';
        style?: React.CSSProperties;
        renderAs?: 'svg' | 'canvas' | 'image';
    }

    export default class QRCode extends Component<QRCodeProps> {}
}
