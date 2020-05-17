class ViewManager {
    protected pixiApp: PIXI.Application;
    protected landscape: boolean;
    protected WIDTH: number;
    protected HEIGHT: number;

    init(width, height) {
        this.WIDTH = width;
        this.HEIGHT = height;
        this.pixiApp = new PIXI.Application({width, height, resolution: 1, backgroundColor: 0x000000});
        window.onresize = () => this.onResize();
        this.onResize();
        window.oncontextmenu =(event) => {
            event.preventDefault();
            event.stopPropagation();
        };
        // this.domView.addEventListener("oncontextmenu", (e
    }

    get width(): number {
        return this.WIDTH;
    }

    get height(): number {
        return this.HEIGHT;
    }


    get domView(): HTMLCanvasElement {
        return this.pixiApp.view;
    }

    get stage(): PIXI.Container {
        return this.pixiApp.stage;
    }

    get renderer(): PIXI.WebGLRenderer | PIXI.CanvasRenderer {
        return this.pixiApp.renderer;
    }

    onResize() {
        const scale = "scale(1)";
        document.body.style.webkitTransform = scale
        document.body.style.transform = scale;

        const vpWidth = window.innerWidth;
        const vpHeight = window.innerHeight;


        this.landscape = vpWidth > vpHeight;
        const scaleFactor = Math.min(vpWidth / this.width, vpHeight / this.height);

        this.domView.style.width = `${vpWidth}px`;
        this.domView.style.height = `${vpHeight}px`;

        this.stage.scale.set(scaleFactor);

        this.renderer.resize(vpWidth, vpHeight);
    }
}

export default new ViewManager();