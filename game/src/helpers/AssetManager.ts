class AssetManger {

    generateGradientTexture(colors: string[],horrizontal = true):PIXI.Texture {
        const canvas = document.createElement("CANVAS") as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, (horrizontal ? 500 : 0), (horrizontal ? 0 : 500));


        const pt = 1 / (colors.length-1);
        for (let colorId = 0 ; colorId < colors.length; colorId++) {
            console.log(pt*colorId);
            gradient.addColorStop(pt * colorId, colors[colorId])
        }

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, (horrizontal ? 500 : 1), (horrizontal ? 1 : 500));

        return PIXI.Texture.fromCanvas(canvas);
    }

    getTexture(spriteId: string): PIXI.Texture {
        let texture: PIXI.Texture;
        if (PIXI.loader.resources) {
            for (const atlasName in PIXI.loader.resources) {
                const atlas = PIXI.loader.resources[atlasName];
                if (atlas.textures) {
                    texture = atlas.textures[spriteId];
                } else if (atlasName == spriteId) {
                    texture = atlas.texture;
                }
                if (texture != undefined) {
                    break;
                }
            }
        }

        if (!texture) {
           console.warn("Texture not fond");
        }

        return texture;
    }


    getAnimationFrames(spriteId: string): PIXI.Texture[] {
        const frames : PIXI.Texture[] = [];
        let counter = 0;
        while (this.getTexture(spriteId + "-" + counter)) {
            frames.push(this.getTexture(spriteId + "-" + counter));
            counter++;
        }

        return frames;

    }
}

export default new AssetManger();