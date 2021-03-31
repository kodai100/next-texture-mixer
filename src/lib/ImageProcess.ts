import * as WebGLUtil from "./WebGLUtil";
import * as MinMatrix from "./MinMatrix";

export class ImageProcess {

    webglUtil: WebGLUtil.WebGLUtil;
    gl: WebGLRenderingContext;

    constructor(public canvas: HTMLCanvasElement){

        // must be defined before get context
        canvas.width = 2048;
        canvas.height = 2048;

        this.gl = <WebGLRenderingContext> canvas.getContext('webgl', {preserveDrawingBuffer: true});
        this.webglUtil = new WebGLUtil.WebGLUtil(this.gl);
    }

    draw = (data: WebGLUtil.Data) => {

        this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    
        this.generateDrawableRect(data);
        
    }

    generateDrawableRect = async (data: WebGLUtil.Data) => {

        let v_shader = this.webglUtil.createShader('vs', data);
        let f_shader = this.webglUtil.createShader('fs', data);

        if(v_shader == undefined || f_shader == undefined) return;

        let prg = <WebGLProgram>this.webglUtil.createProgram(v_shader, f_shader);
        
        let attLocation = new Array(2);
        attLocation[0] = this.webglUtil.gl.getAttribLocation(prg, 'position');
        attLocation[1] = this.webglUtil.gl.getAttribLocation(prg, 'textureCoord');
    
        let attStride = new Array(2);
        attStride[0] = 3;
        attStride[1] = 2;
        
        let position = [
            -1.0,  -1.0,  0.0,
            -1.0,  1.0,  0.0,
            1.0,  1.0,  0.0,
            1.0, -1.0,  0.0
        ];
    
        let textureCoord = [
            0.0, 1.0,
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0
        ];
    
        let index = [
            0, 1, 2,
            2, 3, 0
        ];
        
    
        let vboPosition = this.webglUtil.createVbo(position);
        let vboTextureCoord = this.webglUtil.createVbo(textureCoord);
    
        let ibo = this.webglUtil.createIbo(index);
    
        this.webglUtil.setAttribute([vboPosition, vboTextureCoord], attLocation, attStride);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, ibo);
        
        
        let m = new MinMatrix.MatIV();
        
        let mMatrix = m.identity(m.create());
        let vMatrix = m.identity(m.create());
        let pMatrix = m.identity(m.create());
        let mvpMatrix = m.identity(m.create());
        
        m.orthographic(1.0, -1.0, 1.0, -1.0, 1.0, -1.0, pMatrix);
        
        m.multiply(pMatrix, vMatrix, mvpMatrix);
        m.multiply(mvpMatrix, mMatrix, mvpMatrix);
        
        let uniLocation = new Array(5);
        uniLocation[0]  = this.gl.getUniformLocation(prg, 'mvpMatrix');
        uniLocation[1]  = this.gl.getUniformLocation(prg, 'texture01');
        uniLocation[2]  = this.gl.getUniformLocation(prg, 'texture02');
        uniLocation[3]  = this.gl.getUniformLocation(prg, 'texture03');
        uniLocation[4]  = this.gl.getUniformLocation(prg, 'texture04');
    
        this.gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);
        
        await Promise.all([
            this.bind(data.r.fileName, uniLocation[1], 0, this.gl.TEXTURE0),
            this.bind(data.g.fileName, uniLocation[2], 1, this.gl.TEXTURE1),
            this.bind(data.b.fileName, uniLocation[3], 2, this.gl.TEXTURE2),
            this.bind(data.a.fileName, uniLocation[4], 3, this.gl.TEXTURE3)
        ]);
        
        this.gl.drawElements(this.gl.TRIANGLES, index.length, this.gl.UNSIGNED_SHORT, 0);
    
        this.gl.flush();
        
    }

    bind = async (imgPath: string, uniformLocation: number, uniTextureId: number, activeTextureId: number) => {

        if(imgPath != ""){
            const img = await this.webglUtil.loadImage(imgPath);

            if(img != undefined){
                this.gl.uniform1i(uniformLocation, uniTextureId);
    
                this.gl.activeTexture(activeTextureId);
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.webglUtil.constructTexture(img));
            }
            
        } else{
            const img = await this.webglUtil.loadImage('/black.jpg');
    
            if(img != undefined){
                this.gl.uniform1i(uniformLocation, uniTextureId);
                this.gl.activeTexture(activeTextureId);
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.webglUtil.constructTexture(img));
            }
            
        }
    }
}
