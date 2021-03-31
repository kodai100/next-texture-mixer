import { Data } from "~/constants/DataStructure";

export class WebGLUtil {

    gl: WebGLRenderingContext;

    constructor(gl: WebGLRenderingContext){
        this.gl = gl;
    }

    constructTexture = (img: HTMLImageElement) => {

        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
        
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    
        return texture;
    
    }

    loadImage = async (blobUrl: string) => {

        return new Promise((resolve:(value?: HTMLImageElement) => void, reject:(reason?: any) => void) => {
            const img: HTMLImageElement = new Image();
            img.onload = () => resolve(img);
            img.onerror = (e) => reject(e);
            img.crossOrigin = "anonymous";
            img.src = blobUrl;
        });

    }

    createVbo = (data: number[]) => {
        let vbo = <WebGLBuffer>this.gl.createBuffer();
    
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo);
        
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(data), this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

        return vbo;
    }

    createShader = (shaderType: "vs"|"fs", data: Data) => {
        let shader;
    
        if(shaderType === 'vs'){
            shader = <WebGLShader> this.gl.createShader(this.gl.VERTEX_SHADER);
            this.gl.shaderSource(shader, this.vertexShader());
        } else {
            shader = <WebGLShader> this.gl.createShader(this.gl.FRAGMENT_SHADER);
            this.gl.shaderSource(shader, this.fragmentShader(data));
        }
        
        this.gl.compileShader(shader);

        if(this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            return shader;
        } else{
            alert(this.gl.getShaderInfoLog(shader));
        }
    }

    vertexShader = () => {

        return (

            `attribute vec3 position;
            attribute vec2 textureCoord;
            
            uniform   mat4 mvpMatrix;
            
            varying   vec2 vTextureCoord;
            
            void main(void){
                vTextureCoord = textureCoord;
                gl_Position = mvpMatrix * vec4(position, 1.0);
            }`

        )

    }

    fragmentShader = (data: Data) => {

        return (
            `precision mediump float;

            uniform sampler2D texture01;
            uniform sampler2D texture02;
            uniform sampler2D texture03;
            uniform sampler2D texture04;
            varying vec2      vTextureCoord;
            
            void main(void){
                float r = ${data.r.setting.invert?"1.-":""}texture2D(texture01, vTextureCoord).${data.r.selectedChannel};
                float g = ${data.g.setting.invert?"1.-":""}texture2D(texture02, vTextureCoord).${data.g.selectedChannel};
                float b = ${data.b.setting.invert?"1.-":""}texture2D(texture03, vTextureCoord).${data.b.selectedChannel};
                float a = ${data.a.setting.invert?"1.-":""}texture2D(texture04, vTextureCoord).${data.a.selectedChannel};

                ${data.r.setting.white? data.r.setting.invert?"r=0.;":"r=1.;" :""}
                ${data.g.setting.white? data.g.setting.invert?"g=0.;":"g=1.;" :""}
                ${data.b.setting.white? data.b.setting.invert?"b=0.;":"b=1.;" :""}
                ${data.a.setting.white? data.a.setting.invert?"a=0.;":"a=1.;" :""}

                gl_FragColor = vec4(r, g, b, a);
            }`
        )

    }

    createProgram(vs: WebGLShader, fs: WebGLShader){
        let program = <WebGLProgram> this.gl.createProgram();
        
        this.gl.attachShader(program, vs);
        this.gl.attachShader(program, fs);
        
        this.gl.linkProgram(program);
        
        if(this.gl.getProgramParameter(program, this.gl.LINK_STATUS)){
            this.gl.useProgram(program);
            return program;
        }else{
            alert(this.gl.getProgramInfoLog(program));
        }
    }

    setAttribute = (vbo: WebGLBuffer[], attributeLocation: number[], attributeStride: number[]) => {
        for(let i in vbo){
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vbo[i]);
            this.gl.enableVertexAttribArray(attributeLocation[i]);
            this.gl.vertexAttribPointer(attributeLocation[i], attributeStride[i], this.gl.FLOAT, false, 0, 0);
        }
    }

    createIbo = (data: number[]) => {
        let ibo = this.gl.createBuffer();
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);
        
        this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), this.gl.STATIC_DRAW);
        
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        
        return ibo;
    }
}