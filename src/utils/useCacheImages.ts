


export const useCacheImages = (images: string[]) => {
    const list: HTMLImageElement[] = []
    for (let i = 0; i < images.length; i++) {
        const img = new Image()
        img.onload = function () {
            const index = list.indexOf(this as HTMLImageElement)
            if (index !== -1) {
                list.splice(index, 1)
            }
        }
        img.src = images[i]
        list.push(img)
    }
}