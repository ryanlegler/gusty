import React, {
    CSSProperties,
    ComponentType,
    ComponentPropsWithoutRef,
    ComponentPropsWithRef,
    ReactElement,
} from "react";

const isGustyElement = Symbol("isGustyElement?");

export type IsGustyElement = { [isGustyElement]: true };

export type FlattenInterpolation<P> = ReadonlyArray<Interpolation<P>>;
export type InterpolationValue =
    | string
    | number
    | undefined
    | null
    | false
    | TailwindComponentInterpolation;

export type Interpolation<P> =
    | InterpolationValue
    | InterpolationFunction<P>
    | FlattenInterpolation<P>;

export type InterpolationFunction<P> = (props: P) => Interpolation<P>;
type TailwindComponentInterpolation = PickU<
    TailwindComponentBase<any, any>,
    keyof TailwindComponentBase<any, any>
>;

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements;

type IsAny<T, True, False = never> = True | False extends (T extends never ? True : False)
    ? True
    : False;

export type PickU<T, K extends keyof T> = T extends any ? { [P in K]: T[P] } : never;
export type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

export type TailwindExoticComponent<P> = PickU<
    React.ForwardRefExoticComponent<P>,
    keyof React.ForwardRefExoticComponent<any>
>;

type MergeProps<O extends object, P> = P extends any ? IsAny<P, RemoveIndex<P> & O, P & O> : never;

type TailwindPropHelper<P, O extends object = {}> = PickU<MergeProps<O, P>, keyof MergeProps<O, P>>;

type TailwindComponentPropsWith$As<
    P extends object,
    O extends object,
    $As extends string | ComponentType<any> = ComponentType<P>,
    P2 = $As extends AnyTailwindComponent
        ? TailwindComponentAllInnerProps<$As>
        : $As extends IntrinsicElementsKeys | ComponentType<any>
        ? ComponentPropsWithRef<$As>
        : never
> = P & O & TailwindPropHelper<P2> & { $as?: $As };

export type TailwindComponent<P extends object, O extends object = {}> = IsGustyElement &
    TailwindComponentBase<P, O> &
    WithStyle<P, O>;

export interface TailwindComponentBase<P extends object, O extends object = {}>
    extends TailwindExoticComponent<TailwindPropHelper<P, O>> {
    (props: TailwindPropHelper<P, O> & { $as?: never | undefined }): ReactElement<
        TailwindPropHelper<P, O>
    >;

    <$As extends string | ComponentType<any> = ComponentType<P>>(
        props: TailwindComponentPropsWith$As<P, O, $As>
    ): ReactElement<TailwindComponentPropsWith$As<P, O, $As>>;
}

export interface WithStyle<P extends object, O extends object = {}> {
    withStyle: <S extends object = {}>(
        styles: CSSProperties | ((p: P & O & S) => CSSProperties)
    ) => TailwindComponent<P, O & S>;
}

type AnyTailwindComponent = TailwindComponent<any, any>;

export interface TemplateFunction<P extends object, O extends object = {}> {
    (template: TemplateStringsArray): TailwindComponent<P, O>;
    (
        template: TemplateStringsArray | InterpolationFunction<P & O>,
        ...rest: Array<Interpolation<P & O>>
    ): TailwindComponent<P, O>;
    <K extends object>(
        template: TemplateStringsArray | InterpolationFunction<P & O & K>,
        ...rest: Array<Interpolation<P & O & K>>
    ): TailwindComponent<P, O & K>;
}

export type TailwindComponentInnerProps<C extends AnyTailwindComponent> =
    C extends TailwindComponent<infer P, any> ? P : never;

export type TailwindComponentInnerOtherProps<C extends AnyTailwindComponent> =
    C extends TailwindComponent<any, infer O> ? O : never;

export type TailwindComponentAllInnerProps<C extends AnyTailwindComponent> =
    TailwindComponentInnerProps<C> & TailwindComponentInnerOtherProps<C>;

export type IntrinsicElementsTemplateFunctionsMap = {
    [RTag in keyof JSX.IntrinsicElements]: TemplateFunction<JSX.IntrinsicElements[RTag]>;
};

export interface TailwindInterface extends IntrinsicElementsTemplateFunctionsMap {
    <C extends TailwindComponent<any, any>>(component: C): TemplateFunction<
        TailwindComponentInnerProps<C>,
        TailwindComponentInnerOtherProps<C>
    >;
    <C extends ComponentType<any>>(component: C): TemplateFunction<
        C extends (P?: never) => any ? {} : ComponentPropsWithoutRef<C>
    >;

    <C extends keyof JSX.IntrinsicElements>(component: C): TemplateFunction<
        JSX.IntrinsicElements[C]
    >;
}
