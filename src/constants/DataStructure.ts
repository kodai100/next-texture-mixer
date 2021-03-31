export type Channel = "r" | "g" | "b" | "a";

export type FileChannelPair = {
    fileName: string;
    selectedChannel: Channel;
    setting: ImageSetting;
}

export type Data = {
    r : FileChannelPair;
    g : FileChannelPair;
    b : FileChannelPair;
    a : FileChannelPair;
}

export type ImageSetting = {
    invert: boolean;
    white: boolean;
}