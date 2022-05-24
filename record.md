#### `~ * ^` 关键字的规律，以 `*` 为例子
<!-- #### `*` 关键字的规律 -->

> **关键字中, 内相邻一个字符不可以使用空格** 
> 声明几个变量 italics, italicsAndStrong, Strong, continuityCount 用来记录全局 **`*`** 的数量.

1. 不连续 `*`: italics == 0, 则 +1, 再次遇到不连续则 -1,减到0时, 将内容转换为斜体.

> 如果没匹配完, italics 依旧不清0.

2. 连续 `*`: 判断后一个字符串是否连续,连续则 italics、continuityCount 各+1, italicsAndStrong、Strong 的值根据 italicsAndStrong、Strong / (3 or 2).

3. 当遇到不是连续的 * 时,italics、continuityCount 各 -1,italicsAndStrong、Strong 的值跟随 continuityCount 变动.

4. 再次遇到连续时,判断 continuityCount 是否为 0 , 为 0 则回到 `2.步骤`, 不为0 ,根据 italicsAndStrong、Strong 输出内容为 粗体或粗斜体 , italics、continuityCount -1, continuityCount < 0 则 = 0, italics < 0 则输出为字符串.

5. **匹配当前行时，先判断 `*` 是否是初始/行关键字,是则 italics、continuityCount 清 0，不是则判断 italics、continuityCount 是否 == 0, 不为0, 则向上一行进行匹配.**

6. 直到结束,如果最后剩余一个 `*` / `**` / `***` 未匹配到,则输出为字符串. 