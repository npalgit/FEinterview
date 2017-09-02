/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
    var number = []
    if (root == null) {
        return number
    }
    var stack1 = []//添加
    var stack2 = []//最终访问序列
    stack1.push(root)
    var cur
    while (stack1.length > 0) {
        cur = stack1.pop()
        stack2.push(cur)
        if (cur.left != null) {
            stack1.push(cur)
        }
        if (cur.right != null) {
            stack1.push(cur)
        }
    }
    while (stack2.length > 0) {
        number.push(stack2.pop().val)
    }
    return number
};

/**
 * 标记右子树是否访问过，访问过则可以访问当前节点
 */