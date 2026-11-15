function geometryExtractor(ele){
    const geometry = ele.getBoundingClientRect();
    
    return {
        width : geometry.width,
        height: geometry.height,
        top: geometry.top,
        left: geometry.left,
        right: geometry.right,
        bottom: geometry.bottom,
    }
}