var n //顶点数 
var matrix = [n][n] //邻接矩阵 
var dist = [] //最短路径距离
var path = [] //最短路径序列 path[a] = x，表示v0到a点的最小距离，a的前一个点是x

function dijkstra(v0) { //v0表示源顶点 
    var visited = []
    // 初始化
    for (var i = 0; i < n; i++) {
        if (matrix[v0][i] > 0 && v0 != i) {//点与v0相邻
            dist[i] = matrix[v0][i]
            path[i] = v0 //v0到i的前一个顶点 
        } else {// 若i不与v0直接相邻，则权值置为无穷大 
            dist[i] = MAX
            path[i] = -1
        }
        visited[i] = false
    }
    path[v0] = v0
    dist[v0] = 0
    visited[v0] = true
    
    for (var i = 1; i < n; i++) {
        var mindist = MAX//v0到u的最小距离
        var u
        for (var j = 0; j < n; j++) {
            //寻找未被扩展的权值最小的顶点
            if (visited[j] == false && dist[j] < mindist) {
                mindist = dist[j]
                u = j
            }
        }
        visited[u] = true
        for (var j = 0; j < n; j++) {
            //更新dist数组的值和路径的值 
            if (visited[j] == false && matrix[u][j] < MAX) {
                //当前点未访问，且与u相邻
                //v0到u的最小距离+u到j的距离 < v0到j的距离
                if (mindist + matrix[u][j] < dist[j]) {
                    dist[j] = mindist + matrix[u][j]
                    path[j] = u
                }
            }
        }
    }
}