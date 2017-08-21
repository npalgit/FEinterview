/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/** 左根右
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    var number = []
    if (root == null) {
        return number
    }
    var stack = []
    var cur = root.left//当前要检查的节点
    stack.push(root)
    while (stack.length > 0 || cur != null) {
        //遍历走到左子树最下方
        while (cur != null) {
            stack.push(cur)
            cur = cur.left
        }
        cur = stack.pop()
        number.push(cur.val)
        cur = cur.right
    }
    return number
};