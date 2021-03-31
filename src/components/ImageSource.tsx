import React, { useState, createRef, DragEvent, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';

type Props = {
    label: string;
    imageBlob: string;
    onSetImage: (blobURL: string) => void;
}

export const ImageSource = (props: Props) => {

    const [isDragOver, setIsDragOver] = useState(false);

    const dropAreaRef = createRef<HTMLDivElement>();
    const inputRef = createRef<HTMLInputElement>();

    const onDragOver = (e: DragEvent<HTMLDivElement>) => {

        e.preventDefault();

        // ファイルのコピーを渡すようにする
        if(e.dataTransfer){

            e.dataTransfer.dropEffect = 'copy';
            setIsDragOver(true);
        }
    }

    const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
        setIsDragOver(false);
    }

    const onDrop = (e: DragEvent<HTMLDivElement>) => {

        e.preventDefault();
        
        if(e.dataTransfer){
            setIsDragOver(false);

            organizeFiles(e.dataTransfer.files);
            
        }

    }

    const onClick = () => {
        inputRef.current!.click();
    }

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {

        let inputElement = e.target as HTMLInputElement;

        if(inputElement.files != undefined && inputRef.current != undefined){
            organizeFiles(inputElement.files);
            inputRef.current.value = '';
        }
        
    }

    const organizeFiles = (files: FileList) => {
        let length = files.length;
        let i = 0, file;

        for (; i < length; i++) {
            file = files[i];

            // 画像以外は無視
            if (!file || file.type.indexOf('image/') < 0) {
                continue;
            }

            let maxSize = 20 * 1024 * 1024;

            // 指定したサイズを超える画像は無視
            if (file.size > maxSize) {
                continue;
            }

            outputImage(file);
        }
    }

    const outputImage = (blob: File) => {
        let blobURL = URL.createObjectURL(blob);

        props.onSetImage(blobURL);
    }


    return (
        <DropArea ref={dropAreaRef} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop} onClick={onClick} dragOver={isDragOver} imageBlobUrl={props.imageBlob}>
            <DropInside>
                {props.label}
            </DropInside>
            <FileInput ref={inputRef} onChange={onChangeInput} type="file" accept="image/*"></FileInput>
        </DropArea>
    )

}

const DropArea = styled.div<{dragOver: boolean, imageBlobUrl: string}>`

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    border: 1px #666 dashed;
    color: #999;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    width: 150px;
    height : 150px;

    background-size: 100% 100%;
    background-repeat: no-repeat;

    cursor: pointer;

    background-color: ${({dragOver}) => dragOver ? 'rgba(0, 255, 255, 0.2)' : 'none'};

    background-image: url(${({imageBlobUrl}) => imageBlobUrl});
`;

const DropInside = styled.div`

`;

const FileInput = styled.input`
    display: none;
`;