
declare module "*.png" {
    declare const value: string;
    export default value;
}

declare module "*.jpeg" {
    declare const value: string;
    export default value;
}

declare module "*.jpg" {
    declare const value: string;
    export default value;
}

declare module "*.gif" {
    declare const value: string;
    export default value;
}

declare module '*.svg'
declare module '~/assets/svgs/*.svg' {
    const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    export = value
}