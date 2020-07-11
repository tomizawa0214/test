from django.views.generic import View
from django.shortcuts import render
from .models import Tag, Article


class IndexView(View):
    def get(self, request, *args, **kwargs):
        # タグの作成
        t1 = Tag.objects.create(name='Django', price=500)
        t2 = Tag.objects.create(name='Python', price=2000)

        # 記事の作成
        a = Article.objects.create(title='Djangoでタグ機能を作る')

        # 記事にタグを付加
        a.tags.add(t1)
        a.tags.add(t2)

        # 更新
        a.save()

        # 記事に付加されたタグを取得
        tag_list = a.tags.all()
        print(tag_list)

        return render(request, 'app/index.html', {
            'tag_list': tag_list
        })