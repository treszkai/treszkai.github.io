title: Some versatile tools for bash
category: misc
summary: A 7-line bash script that includes 90% of what an average user needs.

I rarely use bash besides the basics: I could use a `for` loop even if woken up at night, but my knowledge of the language doesn't go much further. Hence instead of trying to memorize all the `{}%$` magic, having a few versatile commands in my toolbox comes handy.

Recently I faced the task of renaming a set of files {`foo 02.jpg`, ..., `foo 74.jpg`} to {`foo 06.jpg`, ..., `foo 78.jpg`}, while keeping the order. My approach contained nothing extraordinary:
```bash
#!/bin/bash

for i in `seq 74 2`
do
    printf -v oldname "foo %02d.jpg" $i
    printf -v newname "foo %02d.jpg" $(echo "$i+4" | bc)

    mv "$oldname" "$newname"
done
```

Yet there were some educational points in it:
 - One loops a variable `x` over the lines of a string `values` by `for x in values; do something; something_else; done`.
 - `seq a b` simply prints out the integers from `a` to `b`, inclusive, regardless of which is larger.
 - Variable `x` is assigned a value by `x=foobar`, where there must be _no spaces around the equation sign_.The value of `x` can then be referred to by `$x`.
 - Renaming a set of files to a similar name but later in the alphabet must be done in reverse order.
 - Bash has a built-in `printf` that seems to work as in C: first the string to be printed with format specifiers like `%02d`, followed by the arguments whose values are used according to the format specifiers.
 - With the `-v` option of `printf`, you can save the output into a variable.
 - One can use `$(  )` for executing a command and having bash treat the output as the source code. (It's the same as using backticks, as around `seq 74 2`, but allows nesting and is clearer. Kinda like `eval` in other languages, like JavaScript.) Not shown here, but it even works in quotation marks, e.g. `"$(echo hey yo)"` is like writing `"hey yo"`. Note that the trailing newline is deleted.
 - `bc` is a calculator that reads from the input and outputs nothing but the result on a single line.
 - Don’t forget the quotes around arguments with spaces, like with `mv` above.

One minute of further bash tips are provided by Julia Evans [[here]](https://drawings.jvns.ca/bashtips/).
